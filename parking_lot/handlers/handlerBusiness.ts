import constanst from '../utils/constants'
import { Ticket } from '../models/Ticket'
import { Car } from '../models/Car'

let ticket: Ticket
let car: Car
var arrTickets: Ticket[] 

export class HandlerBusiness {

    constructor(){
        arrTickets = new Array()
    }

    createParkingLot(parkInfo: any){
        return new Promise((resolve, reject)=>{
            if(parkInfo && parkInfo[1]){
                var numberLot = parseInt(parkInfo[1])
                for(var i = 0; i < numberLot; i ++){
                    var ticket_num = this.randomTicketNum()
                    ticket = new Ticket(ticket_num, "", i + 1 )
                    arrTickets.push(ticket)
                }
                return resolve({ status : true, message: `Created parking lot with ${numberLot} slots`})
            }else{
                return resolve({ status: false, message: constanst.ERROR_DATA_NOT_VALID })
            }
        })
    }

    parkVehicle(vehicleInfo: any){
        return new Promise((resolve, reject)=>{
            if(vehicleInfo && vehicleInfo[1]){
                var license_plate = vehicleInfo[1]
                if(arrTickets && arrTickets.length > 0){
                    var index = arrTickets.findIndex(item => item.license_plate === "")
                    if(index != -1){
                        car = new Car(license_plate)
                        var ticketInfo = arrTickets[index]
                        ticketInfo.setLicenseplate(license_plate)
                        return resolve({status: true, message: `Allocated slot number: ${index + 1}`})
                    }else{
                        return resolve({status: false, message: `Sorry, parking slot is full`})
                    }
                }else{
                    return resolve({status: false, message: `Not exist parking lot `})
                }
            }else{
                return resolve({ status: false, message: constanst.ERROR_DATA_NOT_VALID })
            }   
        })
    }

    leaveVehicle(vehicleInfo: any){
        return new Promise((resolve, reject)=>{
            if(vehicleInfo && vehicleInfo[1] && vehicleInfo[2]){
                var license_plate = vehicleInfo[1]
                var useTime = vehicleInfo[2]
                var index = arrTickets.findIndex(item => item.license_plate === license_plate)
                if(index != -1){
                    var ticketInfo = arrTickets[index]
                    ticketInfo.setLicenseplate("")
                    var costPark = this.calculateFee(useTime)
                    return resolve({status: true, message: `Registration number ${license_plate} with Slot Number ${index + 1} is free with Charge ${costPark}`})
                }else{
                    return resolve({status: false, message: `Registration number ${license_plate} not found`})
                }
            }else{
                return resolve({ status: false, message: constanst.ERROR_DATA_NOT_VALID })
            }
        })
    }

    calculateFee(time: number){
        var costPark = 0
        if(time <= 2 ){
            costPark =  10
        }else{
            var increase = time - 2
            costPark = increase * constanst.PARKING_FEE_ON_HOUR + 10
        }
        return costPark
    }

    getParkingInfo(){
        return new Promise((resolve, reject)=>{
            var message = `Slot No. Registration No. \n`
            let arrCars = arrTickets.filter(item => item.license_plate !== "")
            if(arrCars.length > 0){
                for(var i = 0; i< arrCars.length; i ++){
                    message += `${arrCars[i].location} ${arrCars[i].license_plate} \n`
                }
            }
            message = message.slice(0, message.length - 1)
            return resolve({status: true, message: message})
        })
    }

    analyzeSyntax(command: string){
        return new Promise(async (resolve, reject)=>{
            if(command != null){
                try {
                    var data = command.split(" ")
                    var message = constanst.ERROR_COMMANT_NOT_SUPPORT
                    if(data && data.length > 0){
                        var commandline = this.convertAscii(data[0])
                        commandline = commandline.toLowerCase()
                        switch(commandline){
                            case "create_parking_lot":
                                var createData: any = await this.createParkingLot(data)
                                message = createData.message
                                break
                            case "park":
                                var parkData: any = await this.parkVehicle(data)
                                message = parkData.message
                                break
                            case "leave":
                                var leaveData: any = await this.leaveVehicle(data)
                                message = leaveData.message
                                break
                            case "status":
                                var parkingInfo: any = await this.getParkingInfo()
                                message = parkingInfo.message
                                break
                            default:   
                                break
                        }
                    }
                    return resolve({status: true, message: message})
                } catch (error) {
                    return resolve({status: false, message: error })
                }
            }else{
                return resolve({status: false, message: constanst.ERROR_COMMAND_NOT_VALID })
            }
        })
    }

    randomTicketNum() {
        var ticket_num = "";
        var possible = "0123456789";
    
        for (var i = 0; i < 4; i++)
        ticket_num += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return ticket_num;
    }

    convertAscii(symbol: string) {
        symbol = symbol.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        symbol = symbol.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        symbol = symbol.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        symbol = symbol.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        symbol = symbol.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        symbol = symbol.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        symbol = symbol.replace(/đ/g, "d");
        symbol = symbol.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        symbol = symbol.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        symbol = symbol.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        symbol = symbol.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        symbol = symbol.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        symbol = symbol.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        symbol = symbol.replace(/Đ/g, "D");
        return symbol;
    }
}
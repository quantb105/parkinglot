import * as fs from 'fs'
import * as path from 'path'
import constants from './utils/constants'
import { HandlerBusiness } from './handlers/handlerBusiness'

let handlerBusiness: HandlerBusiness

class ParkingLot {
    constructor(){
        handlerBusiness = new HandlerBusiness()
    }
    executeParkinglot = async () =>{
        try {
            const absolutePath = path.resolve(__dirname + '/file_inputs.txt') 
            const dataFile = fs.readFileSync(absolutePath, 'utf8').toString().split("\n")
            if(dataFile){
                for await (const element of dataFile){
                    if(element){
                        var response: any = await handlerBusiness.analyzeSyntax(element)
                        process.stdout.write(response.message + '\n')
                    }else{
                        process.stdout.write(constants.ERROR_NOT_EXIST_DATA_INPUT + '\n')
                    }
                }
            }else{
                process.stdout.write(constants.ERROR_FILE_DATA_NOT_VALID + '\n')
            }
        } catch (error) {
            process.stdout.write(error + '\n')
        } 
    }
}

const parkLot = new ParkingLot()
parkLot.executeParkinglot()


export class Ticket {

    public ticket_num: string
    public license_plate : string
    public location: number
    public time_arrive: Date
    public time_leave: Date

    constructor(ticket_num: string, license_plate: string, location: number){
        this.ticket_num = ticket_num
        this.license_plate = license_plate
        this.location = location
    }

    public getLicenseplate (license_plate: string): string {
        return license_plate
    }

    public setLicenseplate (license_plate: string){
        this.license_plate = license_plate
    }

}
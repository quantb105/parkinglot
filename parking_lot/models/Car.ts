export class Car {
    public license_plate : string 
    public color: string 

    constructor(license_plate: string){
        this.license_plate = license_plate
    }
    public getLicenseplate (license_plate: string): string {
        return license_plate
    }
    public setLicenseplate (license_plate: string){
        this.license_plate = license_plate
    }
}
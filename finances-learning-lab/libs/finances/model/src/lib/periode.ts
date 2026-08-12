export class Periode {
    id: string;
    libelle: string;
    anneeDebut: number;
    anneeFin: number;
    statut: string;
    
    constructor(id:string, libelle:string, anneeDebut:number, anneeFin:number, statut:string){
            this.id = id;
            this.libelle = libelle;
            this.anneeDebut = anneeDebut;
            this.anneeFin = anneeFin;
            this.statut = statut;
    }
}
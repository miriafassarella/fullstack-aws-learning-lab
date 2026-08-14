import { DynamoDBTable } from "@org/data";
import { Periode } from "@org/model";

export class AddPeriodeDal{
    public constructor( private readonly dynamoTable: DynamoDBTable){}

    async addPeriodeDal(periode: Periode): Promise<void>{

        await this.dynamoTable.put({
            PK: `PERIODE#${periode.id}`,
            SK: `PERIODE#${periode.id}`,

            id: periode.id,
            libelle: periode.libelle,
            anneDebut: periode.anneeDebut,
            anneeFin: periode.anneeFin,
            statut: periode.statut
        });

    }
}
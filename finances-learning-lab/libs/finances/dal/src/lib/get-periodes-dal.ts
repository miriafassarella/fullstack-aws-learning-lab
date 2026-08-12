

//objetivo do Dall:

import { DynamoDBTable } from "@org/data";
import { Periode } from "@org/model";

//ir até a tabela dynamoDB finances-learning-lab-data, buscar os itens e transformar em um objeto Periode
export class GetPeriodesDal {

    public constructor( private readonly dynamoDBTable: DynamoDBTable){}

    async getPeriodesDal(): Promise<Array<Periode>> {
        const dataTable = await this.dynamoDBTable.scan();

        return dataTable.map(
            (item)=> new Periode(
                item['id'] as string,
                item['libelle'] as string,
                item['anneeDebut'] as number,
                item['anneeFin'] as number,
                item['statut'] as string

            ) 
        );
    }

}
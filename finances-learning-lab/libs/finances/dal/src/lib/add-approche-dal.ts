import { DynamoDBTable } from "@org/data";
import { Approche, Entitytype } from "@org/model";

export class AddApprocheDal {

    public constructor(private readonly dynamoTable: DynamoDBTable){}

    public async addApprocheDal(approche: Approche): Promise<Approche> {
        await this.dynamoTable.putItem({
            PK: `APPROCHE#${approche.id}`,
            SK: `APPROCHE#${approche.id}`,

            Entitytype: Entitytype.Approche,

            id: approche.id,
            nom: approche.nom
        })
        return approche;
    }
}
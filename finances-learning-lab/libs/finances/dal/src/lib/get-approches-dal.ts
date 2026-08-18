import { DynamoDBTable } from "@org/data";
import { Approche } from "@org/model";

export class GetApprochesDal {

    public constructor(private readonly dynamoDBTable: DynamoDBTable){}

    async getApprochesDal(): Promise<Array<Approche>> {
        const dataTable = await this.dynamoDBTable.scan();

         if (dataTable === null) {
            return [];
        }

        return dataTable?.map(
                    (item) =>
                        new Approche(
                            item['id'] as string,
                            item['nom'] as string
                            
                        ),
                );
    }
}
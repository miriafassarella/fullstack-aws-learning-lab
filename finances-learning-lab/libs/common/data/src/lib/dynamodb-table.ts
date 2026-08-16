import { AttributeValue, DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export interface DynamoDBTableOptions {
  name: string,
  region?: string
}

export interface DynamoDBItem {
  PK: string;
  SK: string;
  [others: string]: unknown;
}

export class DynamoDBTable {
  private readonly client: DynamoDBClient;
  private readonly name: string;

  public constructor(options: DynamoDBTableOptions) {
    this.name = options.name;

    this.client = new DynamoDBClient({
      region: options.region ?? 'ca-central-1'
    })
  }

  //Quando a operação assíncrona terminar, ela vai entregar um array de DynamoDBItem OU null.
  public async scan(): Promise<Array<DynamoDBItem> | null> {
    const items: Record<string, AttributeValue>[] = [];

    //"Crie uma variável chamada output. Ela poderá guardar ou uma resposta de um Scan do DynamoDB, ou undefined."
    let output: ScanCommandOutput | undefined;
//send()= envie este comando para a aws
    do {
      output = await this.client.send(
        new ScanCommand({
          TableName: this.name,
          ExclusiveStartKey: output?.LastEvaluatedKey
        })
      );

      if (output.Items === undefined) {
        return null;
      }
      for (const item of output.Items) {
        items.push(item);
      }

    } while (output.LastEvaluatedKey !== undefined);

    return items.map((item) => unmarshall(item)) as Array<DynamoDBItem>;
  }

  public async putItem(item: DynamoDBItem): Promise<DynamoDBItem> {
    await this.client.send(
      new PutItemCommand({
        TableName: this.name,
        Item: marshall(item, {
          //Se alguma propriedade tiver valor undefined, não tente enviá-la para o DynamoDB."
          removeUndefinedValues: true,
        }),
      }),
    );

    return item;
  }
}
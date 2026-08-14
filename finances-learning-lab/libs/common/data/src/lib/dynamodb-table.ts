import { AttributeValue, DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export interface DynamoDBTableOptions {
  name: string,
  region?: string
}

export interface DynamoDBItem{
  PK: string;
  SK: string;
  [others: string]: unknown;
}

export class DynamoDBTable {
  private readonly client: DynamoDBClient;
  private readonly name: string;

  public constructor(options: DynamoDBTableOptions){
    this.name = options.name;

    this.client = new DynamoDBClient({
      region: options.region ?? 'ca-central-1'
    })
  }

  public async scan(): Promise<Array<DynamoDBItem> | null> {
    const items: Record<string, AttributeValue>[] = [];

    let output: ScanCommandOutput | undefined;

    do{
      output = await this.client.send(
        new ScanCommand({
          TableName: this.name,
          ExclusiveStartKey: output?.LastEvaluatedKey
        })
      );

      if(output.Items === undefined){
        return null;
      }
      for(const item of output.Items){
        items.push(item);
      }
      
    }while(output.LastEvaluatedKey !== undefined);

    return items.map((item)=> unmarshall(item)) as Array<DynamoDBItem>;
  }
 }
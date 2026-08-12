import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

export interface DynamoDBTableOptions {
  name: string;
  region?: string;
}

export class DynamoDBTable {
  private readonly client: DynamoDBDocumentClient;
  private readonly name: string;

  constructor(options: DynamoDBTableOptions) {
    this.name = options.name;

    const dynamoClient = new DynamoDBClient({
      region: options.region ?? 'ca-central-1',
    });

    this.client = DynamoDBDocumentClient.from(dynamoClient);
  }

  async scan(): Promise<Record<string, unknown>[]> {
    const response = await this.client.send(
      new ScanCommand({
        TableName: this.name,
      }),
    );

    return response.Items ?? [];
  }
}
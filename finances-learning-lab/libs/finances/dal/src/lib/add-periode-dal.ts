import { DynamoDBTable } from '@org/data';
import { Periode } from '@org/model';

export class AddPeriodeDal {
  public constructor(
    private readonly dynamoTable: DynamoDBTable,
  ) {}

  public async addPeriodeDal(periode: Periode): Promise<Periode> {
    await this.dynamoTable.putItem({
      PK: `PERIODE#${periode.id}`,
      SK: `PERIODE#${periode.id}`,

      id: periode.id,
      libelle: periode.libelle,
      anneeDebut: periode.anneeDebut,
      anneeFin: periode.anneeFin,
      statut: periode.statut,
    });

    return periode;
  }
}
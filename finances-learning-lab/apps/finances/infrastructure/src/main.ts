import { App } from 'aws-cdk-lib';
import { FinancesStack } from './stacks/finances-stack'; 

const app = new App();

new FinancesStack(app, 'FinancesStack');
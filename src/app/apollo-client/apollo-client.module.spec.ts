import {ApolloClientModule} from './apollo-client.module';

describe('ApolloClientModule', () => {
  let apolloClientModule: ApolloClientModule;

  beforeEach(() => {
    apolloClientModule = new ApolloClientModule();
  });

  it('should create an instance', () => {
    expect(apolloClientModule).toBeTruthy();
  });
});

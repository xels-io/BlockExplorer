import { BlockDetailModule } from './block-detail.module';

describe('BlockDetailModule', () => {
  let blockDetailModule: BlockDetailModule;

  beforeEach(() => {
    blockDetailModule = new BlockDetailModule();
  });

  it('should create an instance', () => {
    expect(blockDetailModule).toBeTruthy();
  });
});

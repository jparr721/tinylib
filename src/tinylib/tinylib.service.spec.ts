import { Test, TestingModule } from '@nestjs/testing';
import { TinylibService } from './tinylib.service';

describe('TinylibService', () => {
  let service: TinylibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TinylibService],
    }).compile();
    await module.init();

    service = module.get<TinylibService>(TinylibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw if not initialized', async () => {
    let thrown = false;
    try {
      await service.getKey('key');
    } catch {
      thrown = true;
    }

    expect(thrown).toBe(true);
  });

  it('should write a key', async () => {
    service.init('localhost:6900', 'smol');
    const out = await service.addKey('wehave', 'bigswag');

    expect(out).toBe(true);
  });

  it('should read a key', async () => {
    service.init('localhost:6900', 'smol');
    const out = await service.getKey('wehave');

    expect(out).toStrictEqual('bigswag');
  });

  it('should delete a key', async () => {
    service.init('localhost:6900', 'smol');
    const out = await service.deleteKey('wehave');

    expect(out).toStrictEqual(true);
  });
});

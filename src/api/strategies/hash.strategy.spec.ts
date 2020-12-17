import { HashStrategy } from './hash.strategy';
import { AuthService } from '../services';
import { createStubInstance } from 'sinon';
import { TestFixtures } from '../../common/test-helpers';

describe('HashStrategy', () => {
    let hashStrategy: HashStrategy;
    let authServiceMock: any;
    let fixtures: TestFixtures;

    beforeEach(async () => {
        fixtures = new TestFixtures();
        authServiceMock = createStubInstance(AuthService);
        hashStrategy = new HashStrategy(authServiceMock);
    });

    xdescribe('authenticate', () => {
        it('positive test', () => {
            authServiceMock.validateHash.resolves(fixtures.getTestSubscriberEntity());

            expect(hashStrategy.authenticate({
                headers: {
                    'content-type': 'application/json',
                    'apikey': '123',
                    'hash': '$2a$10$ujWu9IincNRJN1PqrgJ4UOnwVe1owYQy0hjvvmU2scE0fzYoUJKxq',
                },
                body: '{"eventType":"test_type","data":{"123":"test data string"}}',
            })).resolves.toStrictEqual(hashStrategy);
        });
    });

    describe('authenticate', () => {
        it('negative test', () => {
            authServiceMock.validateHash.resolves(fixtures.getTestSubscriberEntity());

            expect(hashStrategy.authenticate({})).rejects.toThrow();
        });
    });

    it('should be defined', () => {
        expect(hashStrategy).toBeDefined();
    });
});

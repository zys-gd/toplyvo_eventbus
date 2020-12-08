import { SubscribeDto } from '../dto';
import { SubscriberEntity, SubscriptionEntity } from '../entities';

export interface SubscribeServiceInterface {
    /**
     * Method for creation subscription
     * @param subscribeDto
     * @param subscriber
     */
    subscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): Promise<SubscriptionEntity>;

    /**
     * Method for removing subscription
     * @param subscribeDto
     * @param subscriber
     */
    unsubscribe(subscribeDto: SubscribeDto, subscriber: SubscriberEntity): Promise<void>;
}

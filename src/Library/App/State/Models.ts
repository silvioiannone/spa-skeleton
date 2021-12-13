import AppModels from '@/ts/App/State/Models';

// Skeleton models
import { Notification } from '../../App/State/Models/Notification';

const SkeletonModels = {
    Notification
}

const models = { ...SkeletonModels, ...AppModels};

export default models;

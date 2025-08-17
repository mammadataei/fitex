import { nanoid } from 'nanoid';

// Generate a unique ID using nanoid
export function generateUUID(): string {
    return nanoid();
}

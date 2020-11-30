export interface PlaceDto{
    id: number;
    name: string;
    description: string;
    parentPlaceId: number;
    parentPlaceName: string;
}
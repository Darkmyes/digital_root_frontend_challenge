export interface Flight {
    id: number;

    airline: string;
    price: number;
    scales: number;
    duration: string;

    origin: string;
    destiny: string;
    departure: string;
    return: string;
}
export interface News {
    title: string;
    text: string;
    images: File[];
    category: string;
    url?: string;
    video?: File;
}

export interface Slider {
    subtitulo: string;
    images: File[];
}
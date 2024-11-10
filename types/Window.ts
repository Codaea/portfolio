export interface OsWindow {
    id: number;
    title:string;
    'slot': Component;
    posX: number;
    posY: number;
    width: number;
    height: number;
    zIndex: number;
}

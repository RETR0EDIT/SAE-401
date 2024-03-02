export interface Aliment {
    nom: string;
    quantite: number;
  }
  
  export interface Box {
    nom: string;
    prix: number;
    image: string;
    aliments: Aliment[];
    alimentsString: string;
    saveurs: string;
    id_boxe: string;
  }
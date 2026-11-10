import photos from '../config/photos.json';
import {Photo} from './Shared';
export default function PhotoGallery(){return <details className="gallery"><summary>Mais memórias de nós dois <span>+</span></summary><p>Fragmentos da nossa vida, guardados com carinho.</p><div className="gallery-grid">{photos.map(p=><Photo key={p.name} name={p.name}/>)}</div></details>}

import pic_1 from '../../public/img/directors/woody_allen.png';
import pic_2 from '../../public/img/directors/michelangelo_antonioni.png';
import pic_3 from '../../public/img/directors/federico_fellini.png';
import pic_4 from '../../public/img/directors/pier_pasolini.png';
import pic_5 from '../../public/img/directors/mel_brooks.png';
import pic_6 from '../../public/img/directors/stanley_kubrick.png';
import pic_7 from '../../public/img/directors/sergio_leone.png';
import pic_8 from '../../public/img/directors/jean_luc_godard.png';
import pic_9 from '../../public/img/directors/roman_polanski.png';
import pic_10 from '../../public/img/directors/francis_coppola.png';
import pic_11 from '../../public/img/directors/martin_scorsese.png';
import pic_12 from '../../public/img/directors/george_lucas.png';
import pic_13 from '../../public/img/directors/david_lynch.png';
import pic_14 from '../../public/img/directors/steven_spielberg.png';
import pic_15 from '../../public/img/directors/john_carpenter.png';
import pic_16 from '../../public/img/directors/james_cameron.png';
import pic_17 from '../../public/img/directors/francois_truffaut.png';
import pic_18 from '../../public/img/directors/brian_palma.png';

const IMAGES = [pic_1, pic_2, pic_3, pic_4, pic_5, pic_6, pic_7, pic_8, pic_9, pic_10, pic_11, pic_12, pic_13, pic_14, pic_15, pic_16, pic_17, pic_18];

function ImageService() {}

ImageService.getDirectorImage = (label: string) => {
	for (let i in IMAGES) {  	
  	if (IMAGES[i].includes(label)) {
  		return IMAGES[i];
  	}
  }
  return '';
};

export default ImageService;
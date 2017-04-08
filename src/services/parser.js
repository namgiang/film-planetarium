import Papa from 'papaparse';

export function parse(file: string) {
	return new Promise((resolve, reject) => {
		Papa.parse(file, {
			download: true,
			header: true,
			complete: function(results) {
			  return resolve(results);
		  }
		});
	});
}

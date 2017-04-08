import Papa from 'papaparse';

export function parse(fileName: string) {
	return new Promise((resolve, reject) => {
		Papa.parse('http://localhost:3000/data/' + fileName + '.csv', {
			download: true,
			header: true,
			complete: function(results) {
			  return resolve(results);
		  }
		});
	});
}

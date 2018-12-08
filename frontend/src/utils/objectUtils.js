/* eslint-disable */

export default function getObjectById(array, id, fieldName) {
  for (let i = 0; i < array.length; i++) {
    if (fieldName) {
      if (array[i][fieldName] === id) {
        return array[i];
      }
    } else {
      if (array[i].linearId === id) {
        return array[i];
      }
    }
  }

  return null;
}

export function getObjectsById(array, id, fieldName) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (fieldName) {
      if (array[i][fieldName] === id) {
        result.push(array[i]);
      }
    } else {
      if (array[i].linearId === id) {
        result.push(array[i]);
      }
    }
  }

  return result;
}


//tests
/* console.log('----------------------');
let result = getDuplicatesAsArray([
  { position: 1 },
  { position: 2 },
  { position: 4 },
  { position: 3 }
]);

console.log(result);

console.log('----------------------'); */

/*
 address { }
*/
export function getOrganizationAddress(address) {
  // console.log('getOrganizationAddress', address);
  if (!address) return ' ';
  return [ address.country, address.city, address.street, address.building ].join(', ');
}

export function deleteAllId(object) {
  for(const prop in object) {
    if (prop === 'id') {
      delete object[prop];
    } else if(Array.isArray(object[prop])) {
      object[prop].forEach(el => {
        if (typeof el === 'object') {
          deleteAllId(el);
        }
      });
    } else if (typeof object[prop] === 'object')
      deleteAllId(object[prop]);
  }
  return object;
}

// tests
/* console.log('---------------deleteAllId-------------------');
const test1 = deleteAllId({ id: 0, test: 'test'});
console.log(test1);
const test2 = deleteAllId({ id: 0, test: { test: 'test', id: 1 }});
console.log(test2);
const test3 = deleteAllId({ id: 0, test: { test: 'test', id: 1 }, arr: [ { id: 1 }, {id: 2 }] });
console.log(test3);
console.log('---------------deleteAllId-------------------'); */


export function convertDadata(data) {
  console.log('convertDadata', data);
  let result = data.map(org => {
    return {
      name: org.value,
      inn: org.data.inn,
      kpp: org.data.kpp,
      ogrn: org.data.ogrn,
      contactPerson: '',
      generalDirector: org.data.management ? org.data.management.name : '',
      email: '',
      phone: '',
      okopf: '',
      legalAddress: org.data.address.value,
      postalAddress: org.data.address.value,
      attachmentIds:[]
    };
  });
  console.log(result);
  return result;
}

export function convertFileToPlainObject(file) {
  return {
    name: file.name,
    size: file.size,
    preview: file.preview,
    lastModified: file.lastModified
  };
}
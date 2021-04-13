import {retrievedata} from './../../dbops';

retrievedata('hahah').then(res => {
    console.log(res.length);
})
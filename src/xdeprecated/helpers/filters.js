
/*
Filters and mergers for parsing message and automation documents
 */

export function mergeAutomationSchemaandMessages (arr1,arr2){
    console.log(arr1,arr2)
    return arr1.map((item,i) => {
        if(arr2[i] && item.callID === arr2[i].callID){
            //merging two objects
            return Object.assign({},item,arr2[i])
        }
    })
};


import {$host} from "./index";

export const fetchRows = async (page, limit = 3) => {
    const {data} = await $host.get('/rows', {params: {page, limit}})
    return data
}
import Axios from 'axios';
import baseURL, {URLS} from './URLS';

const appkey = 'zxj_1672896180916';

const request = Axios.create({
    baseURL,
    params: {
        appkey,
    }
});
request.interceptors.response.use((value) => value.data);

const getSideList = (type) => request.get(
    URLS.getSide,
    { params: { type}}
);

const getGoodsList = (type, page, size, sort) => request.get(
    URLS.getGoodsList,
    { params: {type,page,size,sort}}
)

const likeSearch = (value) =>
    request.get(
        URLS.likeSearch,
        {
            params: { likeValue:value }
        }
    ) 

const search = (type, page, size) =>
    request.get(
        URLS.search,
        {
            params: { type, page, size }
        }
    )

const getGoodsByIds = (value) =>
    request.get(
        URLS.getGoodsByIds,
        {
            params: {value}
        }
    )
export default {
    getSideList,
    getGoodsList,
    likeSearch,
    search,
    getGoodsByIds
}
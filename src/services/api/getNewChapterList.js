import axios from '../../utils/axiosCustomize';

const getNewChapterList = async (query) => {
  return await axios.get(`/api/novel/chapter${query}`);
};

export default getNewChapterList;

import axios from '../../utils/axiosCustomize';

const getChapterList = async (id) => {
  return await axios.get(`/api/novel/${id}/chapterList`);
};

export default getChapterList;

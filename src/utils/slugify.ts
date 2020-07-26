import slugify from 'slugify';
import config from 'config/slugify.config';

export default (text: string) => slugify(text, config);

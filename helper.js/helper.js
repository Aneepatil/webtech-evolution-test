export const createSlug = async (title) => {
    let slug = title.toLowerCase();
    slug = slug.replace(/[^a-z0-9\-_\s]/g, ""); // Remove non-alphanumeric characters
    slug = slug.replace(/\s+/g, "-"); // Replace spaces with hyphens
    slug = slug.replace(/[-_]+/g, "-"); // Remove  hyphens and underscores
    slug = slug.replace(/^-+|-+$/g, ""); //  Remove leading and trailing hyphens and underscores
    return slug;
  };
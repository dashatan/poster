export default function postsQuery() {
    return `?query=query {
                posts{
                    thumbnail
                    title
                    topDescription
                    middleDescription
                    bottomDescription
                }
            }`;
}

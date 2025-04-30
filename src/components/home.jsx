export default function Home () {
    const {slug} = useParams()
    
    const categoryProducts = resources.filter((resource, ) => resource.category === slug)
    
    return <h1>Velkommen til Hjemside!!</h1>
}
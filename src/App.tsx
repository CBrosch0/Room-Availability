import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layouts/Layout'
import Home from '@/pages/Home'
import Search from '@/pages/Search'

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App

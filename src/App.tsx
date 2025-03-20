import { Routes, Route } from 'react-router'
import Layout from '@/components/layouts/Layout'
import Home from '@/pages/Home'
import Search from '@/pages/Search'

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
            </Route>
        </Routes>
    )
}

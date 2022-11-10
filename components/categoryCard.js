import Link from "next/link";
import ImageViewer from "./imageViewer";

export default function CategoryCard({ category }) {
    return (
        <>
            <Link href={`/menus/${category.id}`}>
                <div className="w-full rounded-box overflow-hidden my-3 relative">
                    {category.thumbnails ?
                        <>
                            <ImageViewer src={category.thumbnails[0]} height={500} width={500} className='w-full rounded-box' />
                        </>
                        :
                        <>
                            <ImageViewer src={'https://picsum.photos/500/500'} height={500} width={500} className='w-full rounded-box' />
                        </>
                    }
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black">
                        <div className="h-full w-full relative">
                            <div className="absolute bottom-0 left-0 w-full">
                                <h2 className="text-xl font-bold my-5 mx-3 text-white">
                                    {category.name}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'
import { Images } from '../../assets'
import type { BreadCrubmsItem } from '../../types/BreadCrumbs'

interface BreadCrumbProps {
    BreadCrubmItems: BreadCrubmsItem[]
}
export const BreadCrubs: React.FC<BreadCrumbProps> = ({ BreadCrubmItems }) => {
    return (
        <>
            <>
                <div className="breadcrub flex gap-2 pt-2">
                    {BreadCrubmItems &&
                        BreadCrubmItems.map((item, index) => {
                            return (
                                <>
                                    <Link
                                        to={item.path}
                                        className='font-medium text-sm leading-5 text-[#5C59E8]'
                                        
                                    >
                                        {item.lable}
                                    </Link>
                                    {
                                        index < BreadCrubmItems.length - 1 && (
                                            <img
                                                src={Images.right_arrow}
                                                alt="right arrow"
                                                width={18}
                                                height={18}
                                            />
                                        )
                                    }
                                </>
                            )
                        })
                    }
                </div>
            </>
        </>
    )
}

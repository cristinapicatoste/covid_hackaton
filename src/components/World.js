import React, { useEffect, useState } from 'react'
import { getData } from '../helpers/getData'

export const World = () => {
    const [dataWorld, setDataWorld] = useState()
    useEffect(() => {
        getData("OWID_WRL", setDataWorld)
    }, [])
    console.log(dataWorld);

    return (
        <div>

        </div>
    )
}

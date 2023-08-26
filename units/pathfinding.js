import { getSquare } from "../utilities.js"

export function findPath(start, end, unit) {

    console.log(getSquare(6,6), 'неправильный')
    let game = unit.game;
    // document.querySelectorAll('td').forEach(td => {
    //     td.style.filter = 'contrast(1)'
    // })

    class Block {
        constructor(x,y) {
            this.x = Number(x);
            this.y = Number(y)
            this.g
            this.f
        }
    }

    let nd = new Block(end.position.x, end.position.y)
    let st = new Block(start.position.x, start.position.y)
    st.g = 0
    st.f = calcF(st, nd)
    console.log(st.f, 'началф')
    console.warn(st)

    function calcF(start, end) {
        console.log(Math.pow(Math.abs(end.x - start.x)), 'точки')
        // return Math.abs(end.x - start.x) + Math.abs(end.y - start.y)
        return Math.sqrt(Math.pow(Math.abs(end.x - start.x), 2) + Math.pow(Math.abs(end.y - start.y), 2)) + start.g
    } 

    function lastArrEl(arr) {
        return arr[arr.length - 1]
    }

    function checkNbrs(block) {
        let nbrs = [new Block(block.x - 1, block.y),
                    new Block(block.x + 1, block.y),
                    new Block(block.x, block.y + 1), 
                    new Block(block.x, block.y -1)]
    console.log(nbrs, 'живое нефильтрованное')
    let neibours = nbrs.filter((nbr) => 
    (nbr.x >= 0 && nbr.y >= 0)
    && !explored.some(bl => bl.x == nbr.x && bl.y == nbr.y)
    && getSquare(nbr.x, nbr.y) != null
    && noWall(getSquare(nbr.x, nbr.y))
    // && !sucks.some(n => n.x == nbr.x && n.y == nbr.y)
    )
    neibours.forEach(el => {
        if(el.g == undefined || (el.g > block.g + 1)) {
            el.g = block.g + 1
        }
        el.f = calcF(el, nd)
        console.log('эфка', el.f)
        console.log('soss', el, getSquare(el.x, el.y))
        explored = explored.filter(f => !sucks.some(b => b.x == f.x && b.y == f.y))
        if(!explored.some(b => b.x == el.x && b.y == el.y)) {
            explored.push(el)
        }
    })
    // let showArr = {par: getSquare(block.x, block.y), neb: []}
    // neibours.forEach(nn => {
    //     explored.push(nn)
    //     showArr.neb.push(getSquare(nn.x, nn.y))
    // })
   /
    // console.log(showArr.par, showArr.neb, 'сак')
    console.log(explored, 'исследованные')
    
    last = [...explored].reduce((accumulator, current) => {
            return accumulator.f < current.f && !sucks.some(b => b.x == accumulator.x && b.y == accumulator.y) ? accumulator: current})
    path.push(last)
    if (!sucks.some(b => b.x == last.x && b.y == last.y)) {
        sucks.push(last)
    }
    console.log(sucks, 'сосущие')
    // let minOther = explored.reduce((accumulator, current) => {
    //     return accumulator.f < current.f ? accumulator: current})
    // path.push(minNbr) 

}
        let z = 0
        let path = []
        let explored = [st]
        let sucks = [st]
        let last = st
        let a = 0
        z = 0
        while(
            (last.x != nd.x || last.y != nd.y)
            // (lastArrEl(path).x != nd.x || lastArrEl(path).y != nd.y)
            && z< 1000
            ) 
            {
                console.log('правда', last.x != nd.x || last.y != nd.y)
            console.warn(getSquare(last.x, last.y), "последний", "f", last.f,"g", last.g)
            // if(explored.some(b => b.f < last.f)) {
            //     sucks.push(last)
            //     // path = path.filter((s) => s.g <= last.g)
            //     last = explored.reduce((accumulator, current) => {
            //         return accumulator.g < current.g && current.g != 0? accumulator: current})
            //     checkNbrs(last)
            // }
            checkNbrs(last)
            z++
            console.log(z, "zett")
        }
        // nd.g = explored.find(e => e.x == nd.x && e.y == nd.y).g
        // console.warn('последний ге', nd.g)
        
    // while((lastArrEl(path).x != nd.x || lastArrEl(path).y != nd.y)) {
        
    

    //   }
    console.warn(path, 'финальный путь!')
    let next = nd 
    z = 0

    // for(let r = 0; r< path.length; r++) {
    //     let stp = getSquare(path[r].x, path[r].y)
    //     stp.style.filter = 'contrast(5)'
    // }
    console.warn('исследованные!', explored)
    // while (next.g != 1 && z < 15) {
    //     buildWayBack(next)
        // z++
    // }
    // function buildWayBack(square) {
    //     let step = explored.find(n => {
    //         console.log(square, n, Math.abs(square.y - n.y), Math.abs(square.x - n.x) , "данные")
    //         square.g == n.g -1 && Math.abs(square.y - n.y) <= 1 && Math.abs(square.x - n.x) <= 1
    //     })
    //     console.warn(step, 'новая ступень')
    //     path.push(step)
    //     next = step
    // }

    function reducePath(a) {
        if(a.length == 0) {
            return []
        }
        // console.log('ЖАРЮ!')
        // let arr = [...a].reverse();
        // console.log('передфильтрация',[...arr])
        // let indx = arr[0].g
        // let prev = arr[0]
        // for(let i = 1; i < arr.length; i++) {
        //     if(indx <= arr[i].g || (arr[i].x == st.x && arr[i].y == st.y) || (Math.abs(prev.x - arr[i].x) != 1 && Math.abs(prev.y - arr[i].y) != 1)) {
        //      arr[i] = false
        //     } else {
        //         indx = arr[i].g
        //         prev = arr[i]
        //     }
        // }
        // console.log(arr, 'нефильтрован')
        // arr = arr.filter(e => e != false)
        // console.log(arr, 'отфильтрован!')
        // return arr.reverse()
        let final = []
        let arr = [...a].reverse()
        final.push(arr[0])
        console.log('передфильтрация',[...arr])
        arr.forEach(r => {
            let f = lastArrEl(final)
            if(r.g < f.g && (Math.abs(r.x - f.x) <= 1 && Math.abs(r.y - f.y) <= 1) 
            // && Math.abs(r.x - f.x) + Math.abs(r.y - f.y) <= 2
            )
            final.push(r)
        })
        final = final.reverse()
        return final

    }

    let newPath = reducePath(path)

    // newPath.forEach(step => {
    //         let stepp = getSquare(step.x, step.y)
    //         stepp.style.filter = 'contrast(5)'
    //         console.warn(stepp, step)
    //         // console.log(sucks, 'отстойные')
    // })

    return newPath 
    }
    function noWall(sq) {
        console.log(sq, "проверяю")
        if(sq.classList.contains('sqWall')) {
            return false
        } else {
            return true
        }
    }
// бля сработало
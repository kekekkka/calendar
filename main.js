
let current = new Date()
render(current)
g('#prevmonth').onclick = () => {
    const 月初=new Date(current.getFullYear(),current.getMonth(),1)
    render(new Date(月初 - 86400 * 1000 ))
    
}
g('#nextmonth').onclick = () => {
    const 下月初=new Date(current.getFullYear(),current.getMonth()+1,1)
    render(下月初)
}
g('#today').onclick = () => {
    render(new Date())
}

function g(selector) {
    return document.querySelector(selector)
}
function gs(selector) {
    return document.querySelectorAll(selector)
}
function render(time) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    initTime()
    generteDays()
    current = time
    function initTime() {
        const time = g('#time')
        time.textContent = `${year}年${month}月`
    }
    function generteDays() {
        const 月初 = new Date(year, month - 1, 0)
        const 月初星期几 = 月初.getDay()//获取今天周几
        const 月末 = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
        const 月末几号 = 月末.getDate()
        const 月末星期几 = 月末.getDay()

        const days = g('#days')
        days.innerHTML=''
        let n=0
        for (let i = 1; i <= 月初星期几; i++) {
            const li = document.createElement('li')
            const d = new Date(月初 - 86400 * 1000 * i)
            li.textContent = d.getDate()
            li.classList.add('calender-days-disabled')
            days.prepend(li)//从后往前加
            n+=1
        }
        let selectedLi
        // const 这个月多少天 = 月末几号
        const now = new Date()
        for (let i = 1; i <= 月末几号; i++) {
            const li = document.createElement('li')
            li.textContent = i
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                li.classList.add('calender-days-today')
            }
            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove('calender-days-selected')
                }
                li.classList.add("calender-days-selected")
                selectedLi = li
            }
            const key=`${year}-${month}-${i}`
           const events= window.data[key]
            if(events){
                li.classList.add('calender-days-hasEvents')
            }
            days.append(li)
            n+=1
        }
        let i = 月末星期几 + 1
        for (let j=0; j < 42-n; j++) {
            const delta = i - 月末星期几
            const li = document.createElement('li')
            const d = new Date(月末 - 0 + 86400 * 1000 * delta)
            li.textContent = d.getDate()
            days.append(li)
            li.classList.add('calender-days-disabled')
            i++
        }
    }
    //days
}




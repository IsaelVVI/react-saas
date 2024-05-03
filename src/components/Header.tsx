import style from '../assets/css/header.module.css'

export const Header = () => {


    const sendMessage = () => {
        const text = encodeURIComponent("Olá! vim pelo site da warezap!")
        window.open(`https://wa.me/5585996891799?text=${text}`)
    }

    return (
        <>
            <header className={`col ${style.header}`}>
                {/* Image logo  and title*/}
                <div>
                    <img height={50} src="./images/logo.png" alt="logo" />
                </div>
                {/* Manu desktop */}
                <nav className='d-none d-lg-block'>
                    <ul className={`p-0 m-0 ${style.ul}`}>
                        <li>
                            <button className={style.button_list}>
                                Funcionalidades
                            </button>
                        </li>
                        <li>
                            <button className={style.button_list}>
                                Planos
                            </button>
                        </li>
                        <li>
                            <button className={style.button_list}>
                                Depoimentos
                            </button>
                        </li>
                        <li onClick={sendMessage} className={style.link}>
                            Contato
                            <img src="https://assets-global.website-files.com/65254e435ff7a913e2cbeac5/65256c7d4d80371e4e01ab3e_arrow-up-right.svg" loading="lazy" alt="" />
                        </li>
                    </ul>
                </nav>
                <div className='d-lg-none'>
                    <ul className={`p-0 m-0 ${style.ul}`}>
                        <li className={style.link} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
                        </li>
                    </ul>
                </div>
            </header>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog m-0">
                    <div className={`modal-content ${style.modal}`}>
                        <div className="d-flex align-items-center justify-content-end p-2">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className={`p-0 m-0 d-flex flex-column`}>
                                <li>
                                    <button className={style.button_list}>
                                        Funcionalidades
                                    </button>
                                </li>
                                <li>
                                    <button className={style.button_list}>
                                        Planos
                                    </button>
                                </li>
                                <li>
                                    <button className={style.button_list}>
                                        Depoimentos
                                    </button>
                                </li>
                                <li onClick={sendMessage} className={style.link}>
                                    Contato
                                    <img src="https://assets-global.website-files.com/65254e435ff7a913e2cbeac5/65256c7d4d80371e4e01ab3e_arrow-up-right.svg" loading="lazy" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
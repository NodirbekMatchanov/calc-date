<?php

/** @var yii\web\View $this */

$this->title = 'Калькулятор дат';
?>
<div class="site-index">

    <div class="jumbotron text-center bg-transparent">
        <h1 class="display-4 mt-4">Калькулятор дат</h1>

        <form class="main-search" id="search-form" method="GET" action="">
            <div class="row">
                <div class="form-group col-md-7 col-12" id="sms">
                    <div style="position: relative;">
                        <div class="small">
                            Введите гос. номер грузового автомобиля:
                            <div class="number_hint" style="color: red; display: none;">
                                Введите гос номер автомобиля на русском без пробелов, например:
                                А111АА77
                            </div>
                        </div>
                        <div style="position: relative;">
                            <input class="form-control" type="text" placeholder="А111АА77" id="propusk" autocomplete="off" value="" pattern="[а-яА-Я]{1}\s?[0-9]{3}\s?[а-яА-Я]{2}\s?[0-9]{2,3}" required="">
                            <div class="js-clear-main-number clear-number" style="display: block;">+</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-12">
                    <div class="small m-off">&nbsp;</div>
                    <button class="btn btn-lg btn-primary btn-block" id="check" type="button" style="padding: 5px">Проверить <span class="hidden-xs">пропуск</span></button>
                </div>
                <div class="col-12">
                    <!--<div style="text-align: center; background-color: rgba(0, 0, 0, 0.7); border: 1px solid #fff; padding: 10px;">Приносим свои извинения, идут технические работы<br />пользуйтесь пока <a style="color: #64ca7e" href="https://reestr.ovga.mos.ru/" target="_blank"><strong>официальной формой</strong></a> и обратите внимание,<br /> чтобы увидеть постоянные пропуска <strong>нужно выбирать серию БА</strong></div>-->
                    <div class="loader hidden">Loading...</div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12 text-center js-hide-after-result" style="display: none;">
                    <p>Проверяем пропуск. Обычно проверка занимает до 90 секунд...</p>
                </div>
                <div class="table table-current-pass"></div>
                <div class="table table-pre-pass"></div>
            </div>
        </form>
    </div>

    <div class="body-content">



    </div>
</div>

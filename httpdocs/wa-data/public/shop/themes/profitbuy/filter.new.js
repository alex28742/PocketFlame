                $(document).ready(function() {
                    var typeArray = [],
                        collection,
                        decoration,
                        mainMinPrice = $('.filter-slider-wrapper .min').attr('placeholder'),
                        mainMaxPrice = $('.filter-slider-wrapper .max').attr('placeholder');

                        // Собираем массив типов
                        $('.features-row-inline input').each(function() {
                            if ($(this).is(':checked')) { typeArray.push(parseInt($(this).val())); };
                        });
                        console.log(typeArray);
                        // Собираем массив типов, конец

                        // Проставляем минимальную и максимальную цены на коллекции и отделки
                        $('.line-collection.t2').each(function() {
                            var c = $(this);
                            var dec = c.children('.t4');
                            var cMinPrice = mainMaxPrice;
                            var cMaxPrice = mainMinPrice;
                            dec.each(function() {
                                var d = $(this);
                                var li = d.children('ul').children('li');
                                var dataMin = d.data('min-price');
                                var dataMax = d.data('max-price');
                                var dMinPrice = mainMaxPrice;
                                var dMaxPrice = mainMinPrice;
                                li.each(function() {
                                    var item = $(this);
                                    var price = item.data('price');
                                    if (price < dMinPrice) { dMinPrice = price; };
                                    if (price > dMaxPrice) { dMaxPrice = price; };
                                }).parent().parent()
                                  .attr('data-min-price',dMinPrice)
                                  .attr('data-max-price',dMaxPrice);
                                  if (cMinPrice > dMinPrice) { cMinPrice = dMinPrice };
                                  if (cMaxPrice < dMaxPrice) { cMaxPrice = dMaxPrice; };
                            }).parent()
                              .attr('data-min-price',cMinPrice)
                              .attr('data-max-price',cMaxPrice);
                        });

                        // Проверка выбора коллекции
                        if ($('#id-collection-select').val() != '') {
                            collection = $('#id-collection-select').val();
                            var d = $('#id-select-decoration');
                            d.children('option.opt').each(function() {
                                var o = $(this);
                                var oC = $(this).data('id-collection');
                                if (oC == collection) {
                                    o.show();
                                } else {
                                    o.hide();
                                };
                            }).parent().removeAttr('disabled');
                            if ($('#id-select-decoration').val() == '') {
                                var inputMin = $('.filter-slider-wrapper .min');
                                var inputMax = $('.filter-slider-wrapper .max');
                                var colMinPrice = $('.line-collection.t2[data-title-collection="'+collection+'"]').data('min-price');
                                var colMaxPrice = $('.line-collection.t2[data-title-collection="'+collection+'"]').data('max-price');
                                inputMin.val(colMinPrice).trigger('change');
                                inputMax.val(colMaxPrice).trigger('change');
                            };
                        };
                        // Проверка выбора коллекции, конец

                        // Проверка выбора отделки
                        if ($('#id-select-decoration').val() != '') {
                            decoration = $('#id-select-decoration').val();

                            var inputMin = $('.filter-slider-wrapper .min');
                            var inputMax = $('.filter-slider-wrapper .max');
                            var decMinPrice = $('.line-collection.t4[data-title-decoration="'+decoration+'"]').data('min-price');
                            var decMaxPrice = $('.line-collection.t4[data-title-decoration="'+decoration+'"]').data('max-price');
                            inputMin.val(decMinPrice).trigger('change');
                            inputMax.val(decMaxPrice).trigger('change');
                        };
                        // Проверка выбора отделки, конец


                        // Применить фильтр
                        $('.filters').on('click', '#btn-filter-use', function(event) {
                            event.preventDefault();
                            if (typeArray == '') {
                                var typeLine = $('.art-top-line');
                                typeLine.addClass('needChange');
                                $('.row-item-features').on('change', 'input', function(event) { typeLine.removeClass('needChange'); });
                                setTimeout(function() { typeLine.removeClass('needChange'); }, 3000);
                                return false;
                            } else {
                                var minPrice = $('.prices-text input.min-value').val();
                                var maxPrice = $('.prices-text input.max-value').val();
                                // Сортировка коллекции и отделки
                                if (collection && decoration) {
                                    // Скрываем категории и отделки
                                    $('.line-collection.t2').each(function() {
                                        var c = $(this);
                                        var dC = c.data('title-collection');
                                        if (dC == collection) {
                                            c.children('.line-collection').each(function() {
                                                var d = $(this);
                                                var dD = d.data('title-decoration');
                                                if (dD == decoration) {
                                                    d.children('ul').children('li').each(function() {
                                                        var li = $(this);
                                                        var type = li.data('type-id');
                                                        var price = li.data('price');
                                                        if ($.inArray(type, typeArray) !== -1 &&
                                                            price >= minPrice &&
                                                            price <= maxPrice)
                                                        {
                                                            li.show();
                                                        } else {
                                                            li.hide();
                                                        };
                                                    }).parent().parent().show();
                                                } else {
                                                    d.hide();
                                                };
                                            }).parent().show();
                                        } else {
                                            c.hide();
                                        }
                                    });
                                } else if (collection && !decoration) {
                                    $('.line-collection.t2').each(function() {
                                        var c = $(this);
                                        var dC = c.data('title-collection');
                                        if (dC == collection) {
                                            c.children('.line-collection').each(function() {
                                                var d = $(this);
                                                d.show().children('ul').children('li').each(function() {
                                                    var li = $(this);
                                                    var type = li.data('type-id');
                                                    var price = li.data('price');
                                                    if ($.inArray(type, typeArray) !== -1 &&
                                                        price >= minPrice &&
                                                        price <= maxPrice)
                                                    {
                                                        li.show().parent().parent().addClass('active');
                                                    } else {
                                                        li.hide();
                                                    };
                                                }).parent().parent().each(function() {
                                                    if (!d.hasClass('active')) {
                                                        d.hide();
                                                    } else {
                                                        d.removeClass('active').show();
                                                    }
                                                });
                                            }).parent().show();
                                        } else {
                                            c.hide();
                                        };
                                    });
                                } else {
                                    $('.line-collection.t2').each(function() {
                                        var c = $(this);
                                        var dC = c.data('title-collection');
                                        c.show().children('.line-collection').each(function() {
                                            var d = $(this);
                                            d.show().children('ul').children('li').each(function() {
                                                var li = $(this);
                                                var type = li.data('type-id');
                                                var price = li.data('price');
                                                if ($.inArray(type, typeArray) !== -1 &&
                                                    price >= minPrice &&
                                                    price <= maxPrice)
                                                {
                                                    li.show().parent().parent().addClass('active');
                                                } else {
                                                    li.hide();
                                                };
                                            }).parent().parent().each(function() {
                                                if (!d.hasClass('active')) {
                                                    d.hide();
                                                } else {
                                                    d.show().removeClass('active').parent().addClass('active');
                                                }
                                            });
                                        }).parent().each(function() {
                                            if (!c.hasClass('active')) {
                                                c.hide();
                                            } else {
                                                c.show().removeClass('active');
                                            }
                                        });
                                    });
                                }
                            };
                        });
                        // Применить фильтр, конец


                        // Сбрасываем верхнюю часть фильтра
                        $('.filters').on('click', '#reset-features-top', function(event) {
                            event.preventDefault();
                            var f = $('.features-row-inline');
                            var item = f.children('.row-item-features');
                            item.each(function() {
                                var input = $(this).find('input.at-stylize-input');
                                var typeId = input.val();
                                if (input.is(':checked')) {
                                    input.trigger('click');
                                };
                            });
                        });
                        // Сбрасываем верхнюю часть фильтра, конец


                        // Сбрасываем нижнюю часть фильтра
                        $('.filters').on('click', '#clear-filters-expand', function(event) {
                            event.preventDefault();
                            if (collection) {
                                var c = $('#id-collection-select');
                                var cf = c.children('option:first');
                                cf.attr('selected', 'selected').trigger('change');
                            }

                            var minPlace = $('.filter-slider-wrapper .min').attr('placeholder');
                            var maxPlace = $('.filter-slider-wrapper .max').attr('placeholder');
                            $('.filter-slider-wrapper .min').val(minPlace).trigger('change').next().val(maxPlace).trigger('change');

                        });
                        // Сбрасываем нижнюю часть фильтра, конец

                        // Выбор типа
                        $('.features-row-inline').on('change', 'input.at-stylize-input', function(event) {
                            // Добавление/удаление типа
                            event.preventDefault();
                            var typeBox = $(this);
                            var typeId = parseInt(typeBox.val());
                            var cs = $('#id-collection-select');
                            var csId = cs.val();
                            var c = $('.line-collection.t2');

                            if ($(this).is(':checked')) {
                                if ($.inArray(typeId, typeArray) === -1) { typeArray.push(typeId); };

                                // Сортировка коллекции
                                c.each(function() {
                                    var col = $(this);
                                    var cID = col.data('title-collection');
                                    var li = col.find('li');
                                    li.each(function() {
                                        var item = $(this);
                                        var liType = item.data('type-id');
                                        if ($.inArray(liType, typeArray) !== -1) {
                                            cs.children('option[value="'+cID+'"]').show();
                                            return false;
                                        } else {
                                            cs.children('option[value="'+cID+'"]').hide();
                                        };
                                    });
                                    if (cs.children('option:selected').is(':hidden')) {
                                        cs.children('option:first').attr('selected', 'selected').trigger('change');
                                    }
                                });
                                // Сортировка коллекции, конец

                            } else {
                                var index = typeArray.indexOf(typeId);
                                if (index > -1) { typeArray.splice(index, 1); };

                                // Сортировка коллекции
                                c.each(function() {
                                    var col = $(this);
                                    var cID = col.data('title-collection');
                                    var li = col.find('li');
                                    li.each(function() {
                                        var item = $(this);
                                        var liType = item.data('type-id');
                                        if ($.inArray(liType, typeArray) !== -1) {
                                            cs.children('option[value="'+cID+'"]').show();
                                            return false;
                                        } else {
                                            cs.children('option[value="'+cID+'"]').hide();
                                        };
                                    });
                                    if (cs.children('option:selected').is(':hidden')) {
                                        cs.children('option:first').attr('selected', 'selected').trigger('change');
                                    }
                                });
                                // Сортировка коллекции, конец

                            };
                            // Добавление/удаление типа, конец

                            var ds = $('#id-select-decoration');
                            var dsId = ds.val();

                            // Сортировка отделки
                            if (csId !== '') {
                                var curCol = $('.line-collection.t2[data-title-collection="'+csId+'"]');
                                var d = curCol.children('.t4');
                                d.each(function() {
                                    var decor = $(this);
                                    var dID = decor.data('title-decoration');
                                    var li = decor.find('li');
                                    li.each(function() {
                                        var item = $(this);
                                        var liType = item.data('type-id');
                                        if ($.inArray(liType, typeArray) !== -1) {
                                            ds.children('option[value="'+dID+'"]').show();
                                            return false;
                                        } else {
                                            ds.children('option[value="'+dID+'"]').hide();
                                        };
                                    });
                                    if (ds.children('option:selected').is(':hidden')) {
                                        ds.children('option:first').attr('selected', 'selected').trigger('change');
                                    }
                                });
                            }
                            // Сортировка отделки, конец

                            if (typeArray == '') {
                                cs.attr('disabled', 'disabled');
                            } else {
                                cs.removeAttr('disabled');
                            }
                        });
                        // Выбор типа, конец


                        // Выбираем коллекцию
                        $('.filters').on('change', '#id-collection-select', function(event) {

                            var c = $(this);
                            collection = c.val();
                            var d = $('#id-select-decoration');

                            if (collection != '') {
                                d.children('option.opt').each(function() {
                                    var o = $(this);
                                    var oC = $(this).data('id-collection');
                                    if (oC == collection) {
                                        o.show();

                                        // Сортировка отделки
                                        var ds = $('#id-select-decoration');
                                        var dsId = ds.val();
                                        var curCol = $('.line-collection.t2[data-title-collection="'+collection+'"]');
                                        var d = curCol.children('.t4');
                                        d.each(function() {
                                            var decor = $(this);
                                            var dID = decor.data('title-decoration');
                                            var li = decor.find('li');
                                            li.each(function() {
                                                var item = $(this);
                                                var liType = item.data('type-id');
                                                if ($.inArray(liType, typeArray) !== -1) {
                                                    ds.children('option[value="'+dID+'"]').show();
                                                    return false;
                                                } else {
                                                    ds.children('option[value="'+dID+'"]').hide();
                                                };
                                            });
                                            if (ds.children('option:selected').is(':hidden')) {
                                                ds.children('option:first').attr('selected', 'selected').trigger('change');
                                            }
                                        });
                                        // Сортировка отделки, конец

                                    } else {
                                        o.hide();
                                    };
                                }).parent().removeAttr('disabled');
                                var inputMin = $('.filter-slider-wrapper .min');
                                var inputMax = $('.filter-slider-wrapper .max');
                                var colMinPrice = $('.line-collection.t2[data-title-collection="'+collection+'"]').data('min-price');
                                var colMaxPrice = $('.line-collection.t2[data-title-collection="'+collection+'"]').data('max-price');
                                inputMin.val(colMinPrice).trigger('change');
                                inputMax.val(colMaxPrice).trigger('change');
                                d.children('option:first').prop('selected', 'selected');
                            } else {
                                d.children('option:first').prop('selected', 'selected').parent().attr('disabled','disabled');
                            };
                            decoration = '';
                        });
                        // Выбираем коллекцию, конец


                        // Выбираем отделку
                        $('.filters').on('change', '#id-select-decoration', function(event) {
                            var d = $(this);
                            decoration = d.val();

                            var inputMin = $('.filter-slider-wrapper .min');
                            var inputMax = $('.filter-slider-wrapper .max');
                            var decMinPrice = $('.line-collection.t4[data-title-decoration="'+decoration+'"]').data('min-price');
                            var decMaxPrice = $('.line-collection.t4[data-title-decoration="'+decoration+'"]').data('max-price');
                            inputMin.val(decMinPrice).trigger('change');
                            inputMax.val(decMaxPrice).trigger('change');
                        });
                        // Выбираем отделку, конец

                        //Ввод цены
                        $('.filter-slider a').first().addClass('min-slider').next().addClass('max-slider');
                        $('.filter-slider a').bind('click keyup', function(event) {
                            var that = $(this);
                            if ($(this).hasClass('min-slider')) {
                                $('input.min-value').trigger('change');
                            } else if ($(this).hasClass('max-slider')){
                                $('input.max-value').trigger('change');
                            }
                        });

                        $('.prices-text').on('change', 'input.min-value', function(event) {
                            var input = $(this);
                            var mainInput = $('.filter-slider-wrapper input.min');
                            var valMin = $('input.min-value').val();
                            var valMax = $('input.max-value').val();

                            if (collection && decoration) {
                                var products = $('.line-collection.t4[data-title-decoration="'+decoration+'"]');
                                var decMin = products.data('min-price');
                                var decMax = products.data('max-price');
                                var i = 0;
                                products.children('ul').children('li').each(function() {
                                    var li = $(this);
                                    var liType = li.data('type-id');
                                    var price = li.data('price');
                                    if ($.inArray(liType, typeArray) !== -1 &&
                                        price > valMin &&
                                        price < valMax ) {
                                        i++;
                                        if (i == 1) { return false };
                                    };
                                });
                                if (i == 0) {
                                    if ($(this).hasClass('min-value')) {
                                        $('input.min-value').val(decMin).trigger('change');
                                    } else if ($(this).hasClass('max-value')){
                                        $('input.max-value').val(decMax).trigger('change');
                                    }
                                    if (!$('.slider-hint').length) {
                                        $('.prices-text').append('<div class="slider-hint">Товаров не найдено</div>');
                                        setTimeout(function() {
                                            $('.slider-hint').fadeOut(500).remove();
                                        }, 3000);
                                    };
                                };
                            } else if (collection) {
                                var products = $('.line-collection.t2[data-title-collection="'+collection+'"]');
                                var decMin = products.data('min-price');
                                var decMax = products.data('max-price');
                                var items = products.find('li');
                                var i = 0;
                                items.each(function() {
                                    var li = $(this);
                                    var liType = li.data('type-id');
                                    var price = li.data('price');
                                    if ($.inArray(liType, typeArray) !== -1 &&
                                        price > valMin &&
                                        price < valMax ) {
                                        i++;
                                        if (i == 1) { return false };
                                    };
                                });
                                if (i == 0) {
                                    if ($(this).hasClass('min-value')) {
                                        $('input.min-value').val(decMin).trigger('change');
                                    } else if ($(this).hasClass('max-value')){
                                        $('input.max-value').val(decMax).trigger('change');
                                    }
                                    if (!$('.slider-hint').length) {
                                        $('.prices-text').append('<div class="slider-hint">Товаров не найдено</div>');
                                        setTimeout(function() {
                                            $('.slider-hint').fadeOut(500).remove();
                                        }, 3000);
                                    };
                                };
                            } else {
                                var products = $('.product-list');
                                var items = products.find('li:visible');
                                var i = 0;
                                items.each(function() {
                                    var li = $(this);
                                    var liType = li.data('type-id');
                                    var price = li.data('price');
                                    if ($.inArray(liType, typeArray) !== -1 &&
                                        price > valMin &&
                                        price < valMax ) {
                                        i++;
                                        if (i == 1) { return false };
                                    };
                                });
                                if (i == 0) {
                                    if ($(this).hasClass('min-value')) {
                                        $('input.min-value').val(decMin).trigger('change');
                                    } else if ($(this).hasClass('max-value')){
                                        $('input.max-value').val(decMax).trigger('change');
                                    }
                                    if (!$('.slider-hint').length) {
                                        $('.prices-text').append('<div class="slider-hint">Товаров не найдено</div>');
                                        setTimeout(function() {
                                            $('.slider-hint').fadeOut(500).remove();
                                        }, 3000);
                                    };
                                };
                            };
                            mainInput.val(input.val()).trigger('change');
                        });

                        $('.prices-text').on('change', 'input.max-value', function(event) {
                            var input = $(this);
                            var mainInput = $('.filter-slider-wrapper input.max');
                            var valMin = $('input.min-value').val();
                            var valMax = $('input.max-value').val();

                            if (collection && decoration) {
                                var products = $('.line-collection.t4[data-title-decoration="'+decoration+'"]');
                                var decMin = products.data('min-price');
                                var decMax = products.data('max-price');
                                var i = 0;
                                products.children('ul').children('li').each(function() {
                                    var li = $(this);
                                    var liType = li.data('type-id');
                                    var price = li.data('price');
                                    if ($.inArray(liType, typeArray) !== -1 &&
                                        price > valMin &&
                                        price < valMax ) {
                                        i++;
                                        if (i == 1) { return false };
                                    };
                                });
                                if (i == 0) {
                                    if ($(this).hasClass('min-value')) {
                                        $('input.min-value').val(decMin).trigger('change');
                                    } else if ($(this).hasClass('max-value')){
                                        $('input.max-value').val(decMax).trigger('change');
                                    }
                                    if (!$('.slider-hint').length) {
                                        $('.prices-text').append('<div class="slider-hint">Товаров не найдено</div>');
                                        setTimeout(function() {
                                            $('.slider-hint').fadeOut(500).remove();
                                        }, 3000);
                                    };
                                };
                            } else if (collection) {
                                var products = $('.line-collection.t2[data-title-collection="'+collection+'"]');
                                var decMin = products.data('min-price');
                                var decMax = products.data('max-price');
                                var items = products.find('li');
                                var i = 0;
                                items.each(function() {
                                    var li = $(this);
                                    var liType = li.data('type-id');
                                    var price = li.data('price');
                                    if ($.inArray(liType, typeArray) !== -1 &&
                                        price > valMin &&
                                        price < valMax ) {
                                        i++;
                                        if (i == 1) { return false };
                                    };
                                });
                                if (i == 0) {
                                    if ($(this).hasClass('min-value')) {
                                        $('input.min-value').val(decMin).trigger('change');
                                    } else if ($(this).hasClass('max-value')){
                                        $('input.max-value').val(decMax).trigger('change');
                                    }
                                    if (!$('.slider-hint').length) {
                                        $('.prices-text').append('<div class="slider-hint">Товаров не найдено</div>');
                                        setTimeout(function() {
                                            $('.slider-hint').fadeOut(500).remove();
                                        }, 3000);
                                    };
                                };
                            } else {
                                var products = $('.product-list');
                                var items = products.find('li:visible');
                                var i = 0;
                                items.each(function() {
                                    var li = $(this);
                                    var liType = li.data('type-id');
                                    var price = li.data('price');
                                    if ($.inArray(liType, typeArray) !== -1 &&
                                        price > valMin &&
                                        price < valMax ) {
                                        i++;
                                        if (i == 1) { return false };
                                    };
                                });
                                if (i == 0) {
                                    if ($(this).hasClass('min-value')) {
                                        $('input.min-value').val(decMin).trigger('change');
                                    } else if ($(this).hasClass('max-value')){
                                        $('input.max-value').val(decMax).trigger('change');
                                    }
                                    if (!$('.slider-hint').length) {
                                        $('.prices-text').append('<div class="slider-hint">Товаров не найдено</div>');
                                        setTimeout(function() {
                                            $('.slider-hint').fadeOut(500).remove();
                                        }, 3000);
                                    };
                                };
                            };
                            mainInput.val(input.val()).trigger('change');
                        });
                        //Ввод цены, конец

                });

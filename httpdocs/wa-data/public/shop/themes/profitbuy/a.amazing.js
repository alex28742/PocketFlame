$(document).ready(function(){
  $('.at-stylize-label').live('click',function(){
    $('#id-collection-select .not-delete').removeClass('not-delete');
    setTimeout(function(){
      $('#id-collection-select .opt:not([disabled])').each(function(){
        $(this).addClass('not-delete').show();
      });
      $('#id-select-otdelka .opt:not([disabled])').each(function(){
        $(this).addClass('not-delete').show();
      });
    },3000);
  });

  function hideEmptyBlocks(){
    $('.at-stylize-label:not(.disabled)').closest('.block-flow').addClass('saved');
    $('.block-flow:not(.saved)').hide();
  }

  function showAllBlocks(){
    $('.block-flow').removeClass('saved').show();
  }

  function maskChanges(){
    $('#product-list').addClass('mask-hide');
    setTimeout(function(){
      $('#product-list').removeClass('mask-hide');
    },4000);
  }

  $('#id-collection-select .opt').click(function(){
    $.session.set('collection_session',$(this).text());
  });

  $('#id-select-otdelka .opt').click(function(){
    $.session.set('otdelka_session',$(this).text());
  });

  $('.art-nav').click(function(){
    del_session_marks();
  });

  function del_top_selects_properties(){
    $.session.clear('brend_session');
    $.session.clear('collection_session');
    $.session.clear('otdelka_session');
  }

  function del_session_marks(){
    $.session.clear('flag_selects_active');
    del_top_selects_properties();
    $.session.remove('setboxes');
    $('.at-stylize-input').removeAttr('checked');
    $('#brend-select').prop('selectedIndex',0);
    $('#id-collection-select').prop('selectedIndex',0);
    $('#id-select-otdelka').prop('selectedIndex',0);
  }

  $('#id-collection-select option:contains("Все коллекции")').live('click',function(){
    $('#id-collection-select option').removeAttr('disabled').css('display','block');
    $('#id-select-otdelka .opt.not-delete').removeClass('not-delete');
    $.session.clear('collection_session');
    $.session.remove('collection_session');
    $.session.clear('otdelka_session');
    $.session.remove('otdelka_session');
  });

  $('#id-collection-select').live('click',function(){
    $('#id-select-otdelka').prop('selectedIndex',0);
    setTimeout(function(){
      $('#id-select-otdelka .opt:not([disabled])').each(function(){
        $(this).addClass('not-delete');
      });
    },4000);
  });

  // $('#id-select-otdelka').click(function(){});

  setTimeout(function(){
    var brend_checked=$.session.get('brend_session');
    var collection_checked=$.session.get('collection_session');
    var otdelki_checked=$.session.get('otdelka_session');
    var selects_active=$.session.get('flag_selects_active');
    if(brend_checked!==undefined){
      $('#brend-select option').each(function(index){
        if($(this).html()==brend_checked){
          $(this).attr("selected","selected");
        }
      });
    }

    if(collection_checked!==undefined){
      $('#id-collection-select option').each(function(){
        if($(this).html()==collection_checked){
          $(this).attr("selected","selected");
        }
      });
    }

    if(otdelki_checked!==undefined){
      $('#id-select-otdelka option').each(function(){
        if($(this).html()==otdelki_checked){
          $(this).attr("selected","selected");
        }
      });
    }

    if(selects_active!==undefined){
      $('#id-collection-select').removeAttr("disabled");
      $('#id-select-otdelka').removeAttr("disabled");
    }

    var new_arr=new Array();
    var aaa=$.session.get('setboxes');
    if(aaa!==undefined){
      aaa=aaa.split(',');
    }

    if(aaa!==undefined&&$.isArray(aaa)){
      $('.at-stylize-input').each(function(){
          var temp=$(this).attr('data-id');
          var isset=$.inArray(temp,aaa);
          if(isset!==-1){
            $(this).filter(':checkbox').prop('checked',true);
          } else {

          }
        });
      } else {
    }

  }, 2000);

  $('#currency option:first').prop('selectedIndex',0);
  var flag_choosed_collection=false;

  $('#brend-select').live('click',function(){
    $('#id-collection-select').prop('selectedIndex',0);
    $('#id-select-otdelka').prop('selectedIndex',0);
    showAllBlocks();
    $('.at-stylize-label').show();
    if(!flag_choosed_collection)return;
    $('.s-select option[disabled]').css('display','block').removeAttr('disabled');
    $('#brend-select .first-value').prop('selectedIndex',0);
  });

  $('#brend-select').change(function(){
    setTimeout(function(){
      $('#id-collection-select .opt:not([disabled])').each(function(){
        $(this).addClass('not-delete').show();
      });
    },4000);
    $('#id-collection-select').removeAttr('disabled');
  });

  $('#brend-select option').live('click',function(){
    setTimeout(function(){
      hideEmptyBlocks();
    },4500);
    $.session.set('brend_session',$(this).text());
    if($(this).is(":contains('Все бренды')")){
      $.session.remove('brend_session');
    }
    $.session.set('flag_selects_active','active');
    $.session.remove('setboxes');
    $.session.remove('collection_session');
    $.session.remove('otdelka_session');

    if(!flag_choosed_collection) return false;
  });

  $('#brend-select .opt').click(function(){
    $.session.set('brend_session',$(this).text());
  });

  $('#id-collection-select').live('change',function(){
    $('#brend-select .opt').removeAttr('disabled').css('display','block');
    $('.at-stylize-label.disabled').removeClass('disabled').css('display','block');
    flag_choosed_collection=true;
    $('#id-select-otdelka').removeAttr('disabled');
    $('#id-collection-select .opt.not-disable').removeClass('not-disable');
    $('#id-select-otdelka .opt[disabled]').removeAttr('disabled').removeAttr('style');
    setTimeout(function(){
      showAllBlocks();
      $('#id-collection-select .opt:not([disabled])').each(function(){
        $(this).addClass('not-delete');
      });
      $('#id-select-otdelka .opt:not([disabled])').each(function(){
        $(this).addClass('not-delete');
      });
    },3000);
  });

  $('#id-select-otdelka').live('change',function(){
    $('#brend-select .opt').removeAttr('disabled').css('display','block');
    setTimeout(function(){
      $('#id-collection-select .not-delete').each(function(){
        $(this).removeAttr('disabled').css('display','block');
      });
    },4000);
  });

  $('.row-items').slideUp(1500);

  $('.data-407').live('click',function(){
    $('.row-items').slideDown(1500);
  });

  $('.data-406').live('click',function(){
    $('.row-items').slideUp(1500);
  });

  var max_count_page=$('.end-number').html()*1;
  if(max_count_page==="undefined")return false;
  var flag_catch_interval;
  var time_to_reload=2000;
  var timeOutRightDescription;
  var timeOutLeftDescription;
  var current=1;

  function getUrlVars(){
    var vars=[],hash,temp;
    var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
    for(var i=0;i<hashes.length;i++){
      hash=hashes[i].split('&');
      vars.push(hash[0]);
      vars[hash[0]]=hash[1];
      if(temp===undefined)temp=hash[0];
    }
    return temp;
  }

  function catch_change(new_value){
    flag_catch_interval=setInterval(function(){
      if($('.page-input').val()!=current){
        if(!check_correct_value($('.page-input').val())){
          clearInterval(flag_catch_interval);
          $('.page-input').val(current);
          return false;
        }
        clearInterval(flag_catch_interval);
        redirect_new_page($('.page-input').val());
        return false;
      }
    },2000);
  }

  function check_correct_value(value){
    var values=$.trim(value);
    if(isNaN(values)||values>max_count_page||values<1||values==current||$.trim(values)===''){
      return false;
    } else {
     return true;
    }
  }

  function redirect_new_page(num_page){
    var new_params="";
    var clean_get='';
    var set=$('.get').html();
    var split_path=set.split("?");
    if(split_path[0])split_path[1]=split_path[1].replace(/&amp;/g,'&');
    if(split_path[0]===undefined||split_path[1]===""){
      clean_get=''+set+'?pages='+num_page+'';
    }
    if(split_path[1]&&split_path[1].indexOf('pages=')<0){
      clean_get=split_path[0]+'?pages='+num_page+'&'+split_path[1];
      clean_get=clean_get.replace(/&amp;/g,'&');
    }
    if(split_path[0]&&split_path[0].indexOf('pages=')>=0){
      var to_del_str=getUrlVars();
      clean_get=set.replace(''+to_del_str+'','pages='+num_page+'');
      clean_get=clean_get.replace(/&amp;/g,'&');
    }
    $.session.set('flag_selects_active','active');
    window.location.replace(clean_get);
  }

  function pagination_init(){
    var test_get=getUrlVars();
    var num=null;
    if((test_get.indexOf('pages=')+1)>=0){
      num=(test_get.replace(/pages=/g,'0'))*1;
    }
    if(num)$('.page-input').val(num);else $('.page-input').val(1);
    current=$('.page-input').val();
    $('.pgn-left').live('click',function(){
      if(flag_catch_interval)clearInterval(flag_catch_interval);
      var val=$('.page-input').val();
      if(val>1){
        $('.page-input').val(''+val-1+'');
      }else return false;
      if(timeOutLeftDescription)clearTimeout(timeOutLeftDescription);
      timeOutLeftDescription=setTimeout(function(){
        current=val-1;
        redirect_new_page(val-1);
      },time_to_reload);
    });
    $('.pgn-right').live('click',function(){
      if(flag_catch_interval)clearInterval(flag_catch_interval);
      var val=$('.page-input').val()*1;
      if(val<max_count_page){
        $('.page-input').val(""+(val+1)+"");
      }else return false;
      if(timeOutRightDescription)clearTimeout(timeOutRightDescription);
      timeOutRightDescription=setTimeout(function(){
        redirect_new_page($('.page-input').val()*1);
      },time_to_reload);
    });
    $('.page-input').live('click',function(){
      if(flag_catch_interval)clearInterval(flag_catch_interval);
      var new_val=$('.page-input').val();
      catch_change(new_val);
    });
  }

  pagination_init();

  $(window).scroll(function(){
    var top=$(this).scrollTop();
    if(top>1024&&top<1100){
      $('.als-question').css('position','relative');
    }else if(top<1024&&top>1000){
      $('.als-question').css('position','static');
    }
    if(top>1024){
      var diff=top-1024;
      $('.als-question').css('top',''+diff+'px');
    }
  });

  function GetPriseByFilter(){
    var min=0;
    var max=0;
    var count=0;
    $('.item-price').each(
      function(){
        count++;
        if(min===0)min=$(this).text();
        if(Number($(this).text())>max)max=Number($(this).text());
        if(Number($(this).text())<min)min=Number($(this).text());
      });
  }

  setTimeout(function(){
    $('.art-nav li.art-parent').hover(initem,outtem);
  },500);

  setTimeout(function(){
    $('.art-nav li.art-parent').hover(initem,outtem);
  },1500);

  setTimeout(function(){
    $('.art-nav li.art-parent').hover(initem,outtem);
  },2500);

  function initem(){
    $(this).prev('li').css('color','#3B3D47');
    $(this).next('li').css('color','#3B3D47');
  }

  function outtem(){
    $(this).prev('li').css('color','#b4b4b7');
    $(this).next('li').css('color','#b4b4b7');
  }

  setTimeout(function(){
    $('li.selected').removeClass('selected');
  },2000);

  function addTypeName(type){
    if(type=="Тип пишущего узла")$('.prise-wrapper .type-uzel').css('display','none !important');
    $('.features td:contains('+type+')').each(function(){
      var val=$(this).next().html();
      $(this).closest('.pl-item-info-expandable.art-pl-item-info-expandable').children(':first').after('<span class="item-typename">'+val+'</span><hr class="art-thumbs-hr">');
    });
  }

  addTypeName("Тип товара");

  if($('.get').html()){
    if($('.get').html().indexOf('addition=viewed')!==-1){
      setTimeout(function(){
        $('.prise-wrapper .type-uzel').hide();
      },500);
    }
  }

  $('#reset-features-top').bind('click',function(e){
    e.stopPropagation();
    $("input.at-stylize-input:checkbox").removeAttr("checked");
  });

  function blockFlowUp(){
    $('.block-flow').slideUp(1000);
    $('.art-close-filter a').text("развернуть фильтр");
    $('.art-close-filter').addClass('to-bottom');
  }

  function blockFlowDown(){
    $('.block-flow').slideDown(1000);
    $('.art-close-filter a').text("свернуть фильтр");
    $('.art-close-filter').removeClass('to-bottom');
  }

  $('.art-close-filter').toggle(blockFlowDown,blockFlowUp);
  var page_isset=$('.get').html();
  if(page_isset){
    var inOF=page_isset.indexOf('pages=');
    if(inOF!==-1){
      blockFlowUp();
    }else{}
  }

  function setMetka(){
    if($(window).width()>=980)var limit=9;
    $('.art-wrapper-show-button').hide();
    var count_2=0;
    var count_210=0;
    var count_252=0;
    $('.category-id-2 .art-img-wrap-in-main').each(function(index){
      count_2++;
      if(index>limit){
        $(this).addClass('flow-id-2');
      }
    });
    $('.category-id-210 .art-img-wrap-in-main').each(function(index){
      count_210++;
      if(index>limit){
        $(this).addClass('flow-id-210');
      }
    });
    $('.category-id-252 .art-img-wrap-in-main').each(function(index){
      count_252++;
      if(index>limit){
        $(this).addClass('flow-id-252');
      }
    });
    if(count_2>limit){
      $('.btn-id-2 .art-wrapper-show-button').show();
    }
    if(count_210>limit){
      $('.btn-id-210 .art-wrapper-show-button').show();
    }
    if(count_252>limit){
      $('.btn-id-252 .art-wrapper-show-button').show();
    }
  }

  setMetka();

  function hideElementsPish(){
    $('.flow-id-2').slideUp(1000);
    $('.btn-id-2 .art-sehen-alles').text("смотреть всё");
    $('.btn-id-2 .art-strelka').removeClass('to-top');
  }

  function showElementsPish(){
    $('.flow-id-2').slideDown(1000)
    $('.btn-id-2 .art-sehen-alles').text("компактный вид");
    setTimeout(function(){
      $('.btn-id-2 .art-strelka').addClass('to-top');
    },1000);
  }

  function hideElementsPaper(){
    $('.flow-id-210').slideUp(1000);
    $('.btn-id-210 .art-sehen-alles').text("смотреть всё");
    $('.btn-id-210 .art-strelka').removeClass('to-top');
  }

  function showElementsPaper(){
    $('.flow-id-210').slideDown(1000);
    $('.btn-id-210 .art-sehen-alles').text("компактный вид");
    setTimeout(function(){
      $('.btn-id-210 .art-strelka').addClass('to-top');
    },1000);
  }

  function hideElementsAccess(){
    $('.flow-id-252').slideUp(1000);
    $('.btn-id-252 .art-sehen-alles').text("смотреть всё");
    $('.btn-id-252 .art-strelka').removeClass('to-top');
  }

  function showElementsAccess(){
    $('.flow-id-252').slideDown(1000);
    $('.btn-id-252 .art-sehen-alles').text("компактный вид");
    setTimeout(function(){
      $('.btn-id-252 .art-strelka').addClass('to-top');
    },1000);
  }

  $('.btn-id-2').toggle(showElementsPish,hideElementsPish);
  $('.btn-id-210').toggle(showElementsPaper,hideElementsPaper);
  $('.btn-id-252').toggle(showElementsAccess,hideElementsAccess);
  hideElementsPish();
  hideElementsPaper();
  hideElementsAccess();

  function removeDuplicate(){setTimeout(function(){
    var buffer='пусто';
    $('.line-collection h2:contains(Коллекция:)').each(function(){
      var text=$(this).html();
      if(text===buffer)$(this).hide(1000);
      buffer=text;
    });
    $('.line-collection h4:contains(Отделка:)').each(function(){});},500);
  }

  setTimeout(function(){
    setPriceValue();
  },1000);

  function setPriceValue(){
    if($('.ceny .min').val()==="")$('.ceny .min-value').html($('.filter-slider-wrapper .min').attr('placeholder'));else $('.ceny .min-value').html($('.ceny .min').val());
    if($('.ceny .max').val()==="")$('.ceny .max-value').html($('.filter-slider-wrapper .max').attr('placeholder'));else $('.ceny .max-value').html($('.ceny .max').val());
  }

  setTimeout(function(){
    $('.ui-slider-horizontal').mousemove(function(){
      var interval=setInterval(function(i){setPriceValue();},100);
      $('.ui-slider-horizontal').mouseleave(function(){
        if(interval!="undefined"){
          clearInterval(interval);
          $('.als-top').trigger('click');
        }
      });
    });
  },3000);

  setPriceValue();

  setTimeout(function(){
    $('.base-menu.type1.tree li:contains("Главная")').children().attr('href','/');
  },2000);

  setTimeout(function(){
    $('.level-ul-2').remove();
    $('.level-ul-1 button.toggle-menu-child').remove();
    $('.level-ul-1').children('.parent').each(function(){
      $(this).removeClass('parent');
    });
  },2000);

  // function setAmazingScr(){
  //   if($('.owl-stage-outer').height()!==null)return false;
  //   $('.price_and_stock:contains(undefined)').hide();
  //   $('.rem_col i').hide();
  //   $('.filters-reset').hide();
  //   $('.list .out-of-stock:contains(Нет в наличии)').addClass('top-align-stock');
  //   var list_offers=$('.list .out-of-stock:contains(Нет в наличии)').addClass('top-align').closest('.offers');
  //   list_offers.children('.price-wrapper').remove();
  //   var temp=$('.list .top-align').css('border','1px solid lightred').length;
  //   collectionCall=function(arr_collection,name,level_title){
  //     $.each(arr_collection,function(index,value){
  //       if(value!==""){
  //         $('td:contains('+"'"+value+"'"+')').closest('li').each(function(index){
  //           if(index===0){
  //             if(level_title==1)$(this).before('<div class="line-collection t1" style="clear:both"><h1>'+name+'&nbsp;<span class="art-item-name">'+value+'</span></h1></div>');
  //             if(level_title==2)$(this).before('<div class="line-collection t2" style="clear:both"><h2>'+name+'&nbsp;<span class="art-item-name">'+value+'</span></h2></div>');
  //             if(level_title==3)$(this).before('<div class="line-collection t3" style="clear:both"><h3>'+name+'&nbsp;<span class="art-item-name">'+value+'</span></h3></div>');
  //             if(level_title==4)$(this).before('<div class="line-collection t4" style="clear:both"><h4>'+name+'&nbsp;<span class="art-item-name">'+value+'</span></h4></div>');
  //           }
  //         });
  //       }
  //     })
  //   }
  //   var arr_collection=[];
  //   $('table.features td:contains(Коллекция)').each(function(){
  //     var value_prop=$(this).closest('tr').children('td.value').text();
  //     if((arr_collection.indexOf(''+value_prop+''))==-1){
  //       arr_collection+=$(this).siblings().text()+";";
  //     }
  //   });
  //   var simpleStr=String(arr_collection);
  //   collectionArray=simpleStr.split(";");
  //   collectionCall(collectionArray,"Коллекция:",2);
  //   var arr_otdelki=[];
  //   $('table.features td:contains(Отделка коллекции)').each(function(){
  //     if((arr_otdelki.indexOf(''+$(this).siblings().text()+''))==-1){
  //       arr_otdelki+=$(this).siblings().text()+";";
  //     }
  //   });
  //   var simpleStr=String(arr_otdelki);
  //   collectionArray=simpleStr.split(";");
  //   collectionCall(collectionArray,"Отделка:",4);
  //   var type=$('table.features td:contains(Тип пишущего узла)').siblings().each(function(index){
  //     var type_text=$(this).text();
  //     $(this).closest('.pl-item-info-expandable').children('.stock-and-rating').before('<div class="type-uzel"><span>'+type_text+'</span></div>');
  //   });
  //   $('.pl-item-info-expandable > a').wrap('<div class="link">');
  //   $('.pl-item-info-expandable').each(function(index){
  //     $(this).children("div:not('.stock-and-rating')").closest('div').wrapAll('<div class="row-line"></div>');
  //     var stock_element=$(this).children('.stock-and-rating').detach();
  //     var price_block=$(this).siblings().children().children('.price-wrapper').detach();
  //     $(this).siblings().before('<div class="price_and_stock">'+price_block.html()+''+stock_element.html()+'');
  //     var uzel=$(this).children().children('.type-uzel').clone();
  //     var price_nowrap=$(this).siblings().children('.price.nowrap');
  //     price_nowrap.wrap('<div class="prise-wrapper">');
  //     price_nowrap.after(uzel);
  //   });
  // }

  // setAmazingScr();
  $('.art-parent').click(function(){
    $(this).toggleClass('active');
    if($(this).is('[data-toggle = ul-2]')&&$(this).hasClass('active')){
      $('.space-top').css('display','none');
    }else{
      $('.space-top').css('display','block');
    }
  });

  // setTimeout(function(){
  //   $('.price_and_stock:contains(undefined)').hide();
  // },2000);

  function removeDisabledItems(){
    $('.als-bottom label.disabled').hide();
    $('.als-bottom option:disabled').closest('label').hide();
    setTimeout(function(){
      $('.als-bottom .overflow:not(:has(.at-stylize-label))').closest('.al-block').hide();
    },3000);
  }

  var flag_change=false;
  var setboxes=new Array();
  var brend_session;
  var collection_session;
  var otdelka_session;
  $('.filters.ajax form input').bind('change',function(e){
    maskChanges();$('.als-top').trigger('click');
    if(flag_change)return false;
    flag_change=true;
    setTimeout(function(){
      removeDisabledItems();
      setAmazingScr();
      setPriceValue();
      $('.price_and_stock:contains(undefined)').hide();
      $('.filter-wrapper option[disabled]').hide();
      GetPriseByFilter();
      removeDuplicate();
      addTypeName();
      hideEmptyBlocks();
    },4000);
    $('.filter-wrapper option[disabled]').hide();
    flag_change=false;
    removeDuplicate();
    $('.at-stylize-input').each(function(){
      if($(this).prop('checked')){
        setboxes.push($(this).attr('data-id'));
      }
    });
    if(setboxes){
      setboxes=jQuery.unique(setboxes);
      $.session.set('setboxes',setboxes);
    }
  });

  $('.top-row').bind('change',function(e){
    maskChanges();
    setTimeout(function(){
      $('.at-stylize-input[disabled]').closest('label').css('opacity','0.3');
      $('.at-stylize-input:not([disabled])').closest('label').css('opacity','1');
    },3000);
    if(flag_change)return false;
    flag_change=true;
    setTimeout(function(){
      removeDisabledItems();
      setAmazingScr();
      setPriceValue();
      $('.price_and_stock:contains(undefined)').hide();
      $('.filter-wrapper option[disabled]').hide();
      $('.row-item-features').each(function(){
        $(this).children('.disabled').removeClass('disabled');
      });
      removeDuplicate();
      addTypeName();
      hideEmptyBlocks();
    },4000);
    $('.filter-wrapper option[disabled]').hide();
    flag_change=false;
    removeDuplicate();
  });

  $('#btn-filter-use').on('click',function(){
    $('.product-list').addClass('time-hide');
    $(".btn-sub-form").trigger('click');
    if(flag_change)return false;
    flag_change=true;
    setTimeout(function(){
      removeDisabledItems();
      setAmazingScr();
      setPriceValue();
      $('.price_and_stock:contains(undefined)').hide();
      $('.filter-wrapper option[disabled]').hide();
      $('.row-item-features').each(function(){
        $(this).children('.disabled').removeClass('disabled');
      });
      removeDuplicate();
      $('.time-hide').removeClass('time-hide');
    },4000);
    $('.filter-wrapper option[disabled]').hide();
    flag_change=false;
    removeDuplicate();
  });

  $('#btn-filter-reset').on('click',function(){
    $('.filters-reset').trigger('click');
  });

  $('#clear-filters-expand').live('click',function(){
    del_session_marks();
  });

  $('#logo-image').live('click',function(){
    del_session_marks();
  });

  $('td:contains(Коллекция)').text('Коллекция');
  $('td:contains(Бренд)').text('Бренд');
  $('td:contains(Отделка коллекции)').text('Отделка коллекции');
});
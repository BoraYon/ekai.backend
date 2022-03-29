/*
PRNG => Web Crypto API -- crypto.getRandomValues(Int32Array)
* if müşterinin daha önce bir siparişi yoksa :
        1. olasılık: kitap listesinden random 5 kitap seç.
        2. olasılık: kitap türleri arasından random 5 tür seç, şeçilen türlerin her biri için random 1 kitap şeç.(türleri enum yada tabloda tutmak gerekli !!)
        return
  Docker Container kullan.. Performans incelenmeli !!
  1. customer oid ile order listesinden ilgili kayıtları çek.
  2. order kayıtlarından orderItem'a - kitap'a, kitaptan satış miktarını, fiyat faktör ve tür bilgisini al.
  3. Fiyat faktör bilgisi 50 birime kadar 1, 50 - 100 arası 2, 100 birimden fazla ise 3. faktör bilgisi database e kayıt sırasında ekleniyor.  ( Değiştirmek gerekli )
  4. Kitap türleri arasından en çok tercih ettiği 2 kitap türünü seç
   4.1. iki tür arasındaski satış farkı 10 den az: 3 tane 1.Tür, 2 tane 2.Tür
   4.2. iki tür arasındaski satış farkı 10 50 arası: 4 tane 1.Tür, 1 tane 2.Tür
   4.3  iki tür arasındaski satış farkı  50 üstü için : 5 tane 1.Tür, 0 tane 2.Tür --
   Her bir tür için ayrı ayrı:
        5. tür ve fiyat faktörüne göre kitapları al .
        6. her bi kitap için (number of sell) * (pricing factor) hesapla,
        7.  Sort !!
        8. Türler için oluşturulan limitlere uygun olarak ilk n tanesini listeye al. ( 4.1 de ilk tür için 3 tanesini, 2. tür için )
  return liste..
*
* */

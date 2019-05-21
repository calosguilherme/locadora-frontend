import { Component, OnInit } from '@angular/core';
import { VitrineService } from 'src/app/services/vitrineService';
import { VitrineJogo } from 'src/app/model/vitrineJogo.model';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoaService';
import { JogosService } from 'src/app/services/jogosService';
import { Genero } from 'src/app/model/genero.model';
import { Plataforma } from 'src/app/model/plataforma.model';



@Component({
  selector: 'app-home',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  vitrineJogo: any[]
  pessoas: Pessoa[]
  generos: Genero[]
  plataformas: Plataforma[]
  graficoJogoGenero: any
  graficoJogoPlataforma: any
  graficoJogoGeneroCidade: any
  graficoPessoaPontuacao: any
  tipoGrafico: string = ''

  constructor(
    private vitrineService: VitrineService,
    private pessoaService: PessoaService,
    private jogosService: JogosService
  ) {
  }

  ngOnInit() {
    this.vitrineService.getJogosVitrine().subscribe(vitrineJogo => {
      this.vitrineJogo = vitrineJogo
      this.jogosService.getGeneros().subscribe(generos => {
        this.generos = generos
        this.graficoJogoGenero = this.montaGraficoJogoGenero()
        this.graficoJogoGeneroCidade = this.montaGraficoJogoGeneroCidade()
      })
      this.jogosService.getPlataformas().subscribe(plataformas => {
        this.plataformas = plataformas
        this.graficoJogoPlataforma = this.montaGraficoJogoPlataforma()
      })
    })
    this.pessoaService.getPessoas().subscribe(pessoas => {
      this.pessoas = pessoas
      this.montaGraficoPessoaPontuacao()
    })
     
  }

  montaGraficoJogoGenero() {
    let label = []
    let data = []
    for (let genero of this.generos) {
      label.push(genero.nome)
      data.push(this.vitrineJogo.filter(x => x.jogo.genero.find(y => y.nome == genero.nome)).length)
    }
    return({
      datasets: [{
        data: data,
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#36A2EB",
          "#E7E9ED",
        ],
        label: 'Jogos por Genero'
      }],
      labels: label
    })
  }

  montaGraficoPessoaPontuacao() {
    this.graficoPessoaPontuacao = {
      labels: ['⭐ Estrela', '⭐⭐ Estrela', '⭐⭐⭐ Estrela', '⭐⭐⭐⭐ Estrela', '⭐⭐⭐⭐⭐ Estrela'],
      datasets: [
        {
          label: 'Quantidade de Pessoas',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [this.pessoas.filter(x => x.pontuacao == 1).length, this.pessoas.filter(x => x.pontuacao == 2).length, this.pessoas.filter(x => x.pontuacao == 3).length, this.pessoas.filter(x => x.pontuacao == 4).length, this.pessoas.filter(x => x.pontuacao == 5).length]
        },
      ]
    }
  }

  montaGraficoJogoGeneroCidade() {
    let labels = []
    let dlabel = []
    let data = []
    for (let vitrine of this.vitrineJogo) {
      if (labels.indexOf(vitrine.pessoa.cep.bairro.municipio.nome) == -1) {
        labels.push(vitrine.pessoa.cep.bairro.municipio.nome)
      }
      
    }
    for (let genero of this.generos) {
      dlabel.push(genero.nome)
      data.push(this.vitrineJogo.filter(x => x.jogo.genero.find(y => y.nome == genero.nome)).length)
    }
   return({
      labels: labels,
      datasets: this.montaDataSetGraficoJGC(labels, this.generos, this.vitrineJogo)
    })
    
  }

  montaDataSetGraficoJGC(municipios, generos, vitrine) {
    let data = []
    let dat = []
    let elementosDatasets = []
    for (let genero of generos) {
      for (let municipio of municipios) {
        dat.push(this.calculaQtdCategoriaPorMunicipio(municipio, genero, vitrine))
      }
      data.push(dat)
      dat = []
    }
    for (let i = 0; i < generos.length; i++) {
      data.push()
      elementosDatasets.push(
         {
          label: generos[i].nome,
          backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
          data: data[i]
        },
      ) 
    }
    return(elementosDatasets)

  }

  calculaQtdCategoriaPorMunicipio(municipio, genero, vitrine) {
    return ((vitrine.filter(x => x.pessoa.cep.bairro.municipio.nome == municipio)).filter(y => y.jogo.genero.find(z => z.nome == genero.nome)).length)
  }

  montaGraficoJogoPlataforma() {
    let label = []
    let data = []
    for (let plataforma of this.plataformas) {
      label.push(plataforma.nome)
      data.push(this.vitrineJogo.filter(x => x.jogo.plataforma.find(y => y.nome == plataforma.nome)).length)
    }
    return ({
      datasets: [{
        data: data,
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#36A2EB",
          "#E7E9ED",
        ],
        label: 'Jogos por Plataforma'
      }],
      labels: label
    })
  }


}

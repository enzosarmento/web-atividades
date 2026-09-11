import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Controle da tela ativa no momento
  telaAtual: 'login' | 'registro' | 'esqueci-senha' = 'login';

  // Dados do Login
  email: string = '';
  senha: string = '';

  // Dados de Criar Conta
  nomeRegistro: string = '';
  emailRegistro: string = '';
  senhaRegistro: string = '';
  confirmarSenhaRegistro: string = '';

  // Dados de Esqueci a Senha
  emailRecuperacao: string = '';

  // Estados auxiliares
  mostrarSenha: boolean = false;
  mensagemFeedback: string = '';
  tipoFeedback: 'sucesso' | 'erro' | 'info' = 'info';

  /**
   * Alterna entre as telas
   */
  irParaTela(tela: 'login' | 'registro' | 'esqueci-senha', event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.telaAtual = tela;
    this.mensagemFeedback = '';

    if (tela === 'esqueci-senha' && this.email && !this.emailRecuperacao) {
      this.emailRecuperacao = this.email;
    }

    console.log('Navegando para a tela:', tela);
  }

  /**
   * 1. Ação de Login
   */
  fazerLogin(): void {
    if (!this.email || !this.senha) {
      this.tipoFeedback = 'erro';
      this.mensagemFeedback = 'Por favor, preencha o e-mail e a senha antes de entrar!';

      console.warn('Tentativa de login com campos incompletos:', {
        email: this.email,
        senhaPreenchida: !!this.senha
      });
      return;
    }

    console.log('Dados do Login:', {
      email: this.email,
      senha: this.senha
    });

    this.tipoFeedback = 'sucesso';
    this.mensagemFeedback = `Login efetuado com sucesso para: ${this.email}! (Dados impressos no console)`;
  }

  /**
   * 2. Ação de Criar Conta
   */
  cadastrarConta(): void {
    if (!this.nomeRegistro || !this.emailRegistro || !this.senhaRegistro || !this.confirmarSenhaRegistro) {
      this.tipoFeedback = 'erro';
      this.mensagemFeedback = 'Preencha todos os campos para realizar o cadastro!';

      console.warn('Tentativa de cadastro com campos incompletos:', {
        nome: this.nomeRegistro,
        email: this.emailRegistro
      });
      return;
    }

    if (this.senhaRegistro !== this.confirmarSenhaRegistro) {
      this.tipoFeedback = 'erro';
      this.mensagemFeedback = 'As senhas digitadas não coincidem. Verifique e tente novamente!';

      console.warn('Cadastro não realizado: Senhas não coincidem');
      return;
    }

    console.log('Dados do Cadastro:', {
      nome: this.nomeRegistro,
      email: this.emailRegistro,
      senha: this.senhaRegistro,
      confirmarSenha: this.confirmarSenhaRegistro
    });

    this.tipoFeedback = 'sucesso';
    this.mensagemFeedback = `Conta criada com sucesso para ${this.nomeRegistro}! (Dados impressos no console)`;
  }

  /**
   * 3. Ação de Esqueci a Senha
   */
  enviarRecuperacao(): void {
    if (!this.emailRecuperacao) {
      this.tipoFeedback = 'erro';
      this.mensagemFeedback = 'Informe o seu e-mail cadastrado para recuperar a senha!';

      console.warn('Tentativa de recuperação sem informar o e-mail');
      return;
    }

    console.log('Solicitacao de Recuperacao de Senha:', {
      emailRecuperacao: this.emailRecuperacao
    });

    this.tipoFeedback = 'sucesso';
    this.mensagemFeedback = `Link de redefinição de senha enviado para: ${this.emailRecuperacao}! (Dados impressos no console)`;
  }

  /**
   * Alterna a exibição da senha
   */
  toggleMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
